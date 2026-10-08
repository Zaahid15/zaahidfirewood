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
      image: 'photo-1473448912268-2022ce9509d8',
      imageAlt: 'Sunlight filtering through a mature oak woodland',
      badge: 'Long burn',
    },
    {
      name: 'Ash',
      type: 'Firewood',
      description: 'A dependable all-rounder, valued for its even heat.',
      bestFor: 'Everyday heating · Stoves',
      image: 'photo-1511497584788-876760111969',
      imageAlt: 'Tall trees in a quiet green forest',
      badge: 'Customer favourite',
    },
    {
      name: 'Birch',
      type: 'Firewood',
      description: 'Easy to light, with a bright flame and gentle aroma.',
      bestFor: 'Kindling up · Cosy evenings',
      image: 'photo-1448375240586-882707db888b',
      imageAlt: 'A sunlit woodland path between trees',
    },
    {
      name: 'Beech',
      type: 'Firewood',
      description: 'A versatile hardwood for a welcoming, consistent fire.',
      bestFor: 'Open fires · Wood burners',
      image: 'photo-1448375240586-882707db888b',
      imageAlt: 'Mature trees growing in a green woodland',
    },
    {
      name: 'Mixed Hardwood',
      type: 'Firewood',
      description: 'A practical blend of hardwoods for everyday warmth.',
      bestFor: 'Home heating · Fire pits',
      image: 'photo-1473448912268-2022ce9509d8',
      imageAlt: 'A peaceful woodland with a mix of mature trees',
    },
    {
      name: 'Lumpwood Charcoal',
      type: 'Charcoal',
      description: 'Natural lumpwood charcoal for your next outdoor cook.',
      bestFor: 'Barbecues · Outdoor cooking',
      image: 'photo-1500382017468-9049fed747ef',
      imageAlt: 'An open landscape on a clear summer day',
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
