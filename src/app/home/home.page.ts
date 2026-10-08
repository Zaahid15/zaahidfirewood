import { Component, inject } from '@angular/core';
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
  menuOutline,
  searchOutline,
  shieldCheckmarkOutline,
  sparklesOutline,
} from 'ionicons/icons';

interface Product {
  name: string;
  type: 'Firewood' | 'Charcoal';
  description: string;
  bestFor: string;
  image: string;
  imageAlt: string;
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
  quoteProduct = '';
  quoteName = '';
  quotePhone = '';
  quoteSent = false;
  readonly currentYear = new Date().getFullYear();

  readonly categories = ['All products', 'Firewood', 'Charcoal'];
  readonly products: Product[] = [
    {
      name: 'Oak',
      type: 'Firewood',
      description: 'A dense hardwood with a steady, long-lasting burn.',
      bestFor: 'Log burners · Open fires',
      image: 'photo-1581855754164-c545eb607bfc',
      imageAlt: 'Cut firewood logs stacked together',
      badge: 'Long burn',
    },
    {
      name: 'Ash',
      type: 'Firewood',
      description: 'A dependable all-rounder, valued for its even heat.',
      bestFor: 'Everyday heating · Stoves',
      image: 'photo-1672984581785-60e0ff402fd4',
      imageAlt: 'Rows of cut logs stacked for firewood',
      badge: 'Customer favourite',
    },
    {
      name: 'Birch',
      type: 'Firewood',
      description: 'Easy to light, with a bright flame and gentle aroma.',
      bestFor: 'Kindling up · Cosy evenings',
      image: 'photo-1529331957114-3043d9a878c6',
      imageAlt: 'A pile of split firewood ready for use',
    },
    {
      name: 'Beech',
      type: 'Firewood',
      description: 'A versatile hardwood for a welcoming, consistent fire.',
      bestFor: 'Open fires · Wood burners',
      image: 'photo-1723990073450-7b57bcbfbe13',
      imageAlt: 'Freshly cut logs piled outdoors',
    },
    {
      name: 'Mixed Hardwood',
      type: 'Firewood',
      description: 'A practical blend of hardwoods for everyday warmth.',
      bestFor: 'Home heating · Fire pits',
      image: 'photo-1672984581785-60e0ff402fd4',
      imageAlt: 'Neatly stacked firewood logs',
    },
    {
      name: 'Lumpwood Charcoal',
      type: 'Charcoal',
      description: 'Natural lumpwood charcoal for your next outdoor cook.',
      bestFor: 'Barbecues · Outdoor cooking',
      image: 'photo-1751250302854-72034cfbfca5',
      imageAlt: 'Glowing charcoal embers on a grill grate',
      badge: 'Made for the grill',
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
      menuOutline,
      searchOutline,
      shieldCheckmarkOutline,
      sparklesOutline,
    });
    this.title.setTitle('Zaahid Firewood | Firewood & Charcoal');
    this.meta.updateTag({
      name: 'description',
      content:
        'Explore firewood and charcoal from Zaahid Firewood. Browse oak, ash, birch, beech and mixed hardwood, and enquire about the right fuel for your fire.',
    });
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.updateTag({ property: 'og:title', content: 'Zaahid Firewood | Firewood & Charcoal' });
    this.meta.updateTag({
      property: 'og:description',
      content: 'Browse a range of firewood and charcoal for home fires, stoves and outdoor cooking.',
    });
    this.meta.updateTag({ property: 'og:type', content: 'website' });
  }

  selectCategory(category: string): void {
    this.selectedCategory = category;
  }

  requestProduct(name: string): void {
    this.quoteProduct = name;
    this.quoteSent = false;
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  }

  submitEnquiry(): void {
    const subject = encodeURIComponent(`Product enquiry: ${this.quoteProduct || 'Firewood and charcoal'}`);
    const body = encodeURIComponent(
      `Hello Zaahid Firewood,\n\nI'm interested in: ${this.quoteProduct || 'firewood and charcoal'}.\nName: ${this.quoteName}\nPhone: ${this.quotePhone}\n\nPlease get in touch with availability and pricing.`,
    );
    window.location.href = `mailto:?subject=${subject}&body=${body}`;
    this.quoteSent = true;
  }
}
