import { Component, HostListener, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Meta, Title } from '@angular/platform-browser';
import { IonContent, IonIcon } from '@ionic/angular';
import { addIcons } from 'ionicons';
import {
  arrowDownOutline,
  arrowForwardOutline,
  checkmarkCircleOutline,
  flameOutline,
  leafOutline,
  logoWhatsapp,
  searchOutline,
  shieldCheckmarkOutline,
  sparklesOutline,
} from 'ionicons/icons';

interface Product {
  name: string;
  type: 'Firewood' | 'Charcoal' | 'Firelighters';
  description: string;
  bestFor: string;
  image: string;
  imageAlt: string;
  woodDetails?: string;
  badge?: string;
}

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  imports: [FormsModule, IonContent, IonIcon],
})
export class HomePage {
  private readonly title = inject(Title);
  private readonly meta = inject(Meta);

  searchTerm = '';
  selectedCategory = 'All products';
  selectedWood: Product | null = null;
  readonly currentYear = new Date().getFullYear();

  readonly categories = ['All products', 'Firewood', 'Charcoal', 'Firelighters'];
  readonly products: Product[] = [
    {
      name: 'Bluegum',
      type: 'Firewood',
      description: 'Bluegum firewood for your next braai or home fire.',
      bestFor: 'Braais · Home fires',
      image: 'https://static.wixstatic.com/media/876708_dd5b80aab4f2470e9271b61dfcf6db2c~mv2.jpg/v1/fill/w_960,h_1280,al_c,q_85,enc_avif,quality_auto/876708_dd5b80aab4f2470e9271b61dfcf6db2c~mv2.jpg',
      imageAlt: 'Bluegum braai wood logs',
      woodDetails: 'Bluegum (Eucalyptus) is a very heavy wood that produces extreme heat, with fewer lingering coals than desert hardwoods. Uses: closed-combustion indoor wood stoves, fireplaces and pizza ovens. Its hot, long-lasting burn can make it an economical choice for household heating.',
    },
    {
      name: 'Sekelbos',
      type: 'Firewood',
      description: 'Sekelbos hardwood for South African braais and open fires.',
      bestFor: 'Braais · Open fires',
      image: 'https://capetownfirewood.co.za/cdn/shop/products/SekelbosNamibianHardwood1000KGBulk-Sicklebush-1Ton-CapeTownFirewood.jpg?v=1690322704',
      imageAlt: 'Sekelbos Namibian hardwood firewood',
      woodDetails: 'Sekelbos (Sicklebush) is a dense, dry Namibian hardwood, naturally sun-baked to very low moisture. It is easy to light, burns fiercely hot, creates excellent coals and releases aromatic oils. Uses: braais and potjies.',
    },
    {
      name: 'Rooibos',
      type: 'Firewood',
      description: 'Rooibos firewood for braais and open fires.',
      bestFor: 'Braais · Open fires',
      image: 'https://www.mothercityfirewood.co.za/cdn/shop/files/Rooibos-Hardwood-Bulk-Dense-Red-Bushwillow-Braaiwood-For-sale-100KG-or-more-near-Cape-Town-by-Mother-City-Firewood.jpg?v=1736069449&width=900',
      imageAlt: 'Rooibos hardwood firewood logs',
      woodDetails: 'The document notes that Rooibos is a tea shrub, not firewood, and that Rooikrans may be the intended braai wood. Rooikrans is described as a dense Australian acacia common in the Western Cape. Uses: traditional braais; it lights relatively quickly, sustains flames and leaves long-lasting coals. Please confirm which wood you supply under the Rooibos name.',
    },
    {
      name: 'Swarthaak',
      type: 'Firewood',
      description: 'Swarthaak (black thorn) firewood for braais and open fires.',
      bestFor: 'Braais · Outdoor cooking',
      image: 'https://www.mothercityfirewood.co.za/cdn/shop/collections/Swarthaak_Hardwood_Bulk_-_Braai_wood_from_the_Black_Thorn_Acacia_Tree_-_100KG_Firewood_or_more_for_sale_near_Cape_Town.jpg?v=1735820072&width=900',
      imageAlt: 'Swarthaak black thorn hardwood logs',
      woodDetails: 'Swarthaak (Black Thorn) is an exceptionally dense, slow-growing desert hardwood with a dark or red inner grain. The document describes it as sustainably harvested to help manage farm bush encroachment. Uses: braais and open fireplaces; it provides quick-starting, very hot, steady heat and deep smoky flavours.',
    },
    {
      name: 'Kameeldoring',
      type: 'Firewood',
      description: 'Kameeldoring (camel thorn) firewood for braais and fires.',
      bestFor: 'Braais · Open fires',
      image: 'https://www.firewoodfarm.co.za/wp-content/uploads/2021/06/IMG_7339-scaled.jpg',
      imageAlt: 'Kameeldoring camel thorn firewood',
      woodDetails: 'The supplied wood-description document does not include a Kameeldoring entry. Contact us to confirm its specific burn characteristics and current uses.',
    },
    {
      name: 'Mopane (Export Quality)',
      type: 'Firewood',
      description: 'Mopane firewood, export quality as specified by Zaahid Firewood.',
      bestFor: 'Braais · Outdoor cooking',
      image: 'https://www.wmtrading-nam.com/wp-content/uploads/2023/04/Mopane-Firewood2-1.jpg',
      imageAlt: 'Mopane firewood logs',
      woodDetails: 'Mopane is one of the hardest, heaviest and densest woods. It is naturally dry, termite-resistant and slow-burning. Uses: long cooks, potjies and large social campfires. It can be harder to ignite, but produces intense, clean heat and a lasting bed of solid coals.',
      badge: 'Export quality',
    },
    {
      name: 'Namibian Hardwood Lumpwood Charcoal',
      type: 'Charcoal',
      description: 'Namibian hardwood lumpwood charcoal for braais and outdoor cooking.',
      bestFor: 'Braais · Grilling',
      image: 'https://plus.unsplash.com/premium_photo-1675186939926-ea6bf907a370?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      imageAlt: 'Namibian hardwood restaurant-grade lumpwood charcoal',
      badge: 'Hardwood lumpwood',
    },
    {
      name: 'Firelighters',
      type: 'Firelighters',
      description: 'Firelighters to help get your firewood or charcoal fire started.',
      bestFor: 'Firewood · Charcoal',
      image: 'https://www.geewiz.co.za/1049249-large_default/best-braai-firelighters-foil-pack.jpg',
      imageAlt: 'Box of firelighters',
    },
  ];

  get filteredProducts(): Product[] {
    const term = this.searchTerm.trim().toLowerCase();
    return this.products.filter((product) => {
      const matchesCategory =
        this.selectedCategory === 'All products' || product.type === this.selectedCategory;
      const matchesSearch =
        !term ||
        `${product.name} ${product.type} ${product.description} ${product.bestFor}`
          .toLowerCase()
          .includes(term);
      return matchesCategory && matchesSearch;
    });
  }

  constructor() {
    addIcons({
      arrowDownOutline,
      arrowForwardOutline,
      checkmarkCircleOutline,
      flameOutline,
      leafOutline,
      logoWhatsapp,
      searchOutline,
      shieldCheckmarkOutline,
      sparklesOutline,
    });
    this.title.setTitle('Zaahid Firewood | South African Firewood, Charcoal & Firelighters');
    this.meta.updateTag({
      name: 'description',
      content:
        'Browse Bluegum, Sekelbos, Rooibos, Swarthaak, Kameeldoring, export quality Mopane firewood, Namibian Hardwood Lumpwood Charcoal and firelighters from Zaahid Firewood.',
    });
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.updateTag({
      property: 'og:title',
      content: 'Zaahid Firewood | Firewood, Charcoal & Firelighters',
    });
    this.meta.updateTag({
      property: 'og:description',
      content:
        'Bluegum, Sekelbos, Rooibos, Swarthaak, Kameeldoring and Mopane firewood, Namibian Hardwood Lumpwood Charcoal and firelighters.',
    });
    this.meta.updateTag({ property: 'og:type', content: 'website' });
  }

  selectCategory(category: string): void {
    this.selectedCategory = category;
  }

  openWoodInfo(product: Product): void {
    this.selectedWood = product;
  }

  closeWoodInfo(): void {
    this.selectedWood = null;
  }

  @HostListener('document:keydown.escape')
  closeWoodInfoOnEscape(): void {
    this.closeWoodInfo();
  }

  whatsappLink(productName = ''): string {
    const productMessage = productName
      ? `I'm interested in ${productName}.`
      : 'Please share availability and pricing for your products.';
    const message = `Hello Zaahid Firewood, ${productMessage}`;
    return `https://wa.me/27631244994?text=${encodeURIComponent(message)}`;
  }
}