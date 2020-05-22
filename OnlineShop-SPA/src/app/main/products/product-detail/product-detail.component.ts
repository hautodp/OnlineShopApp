import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/_models/Product';
import { ProductService } from 'src/app/_services/product.service';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { ActivatedRoute } from '@angular/router';
import { NgxGalleryOptions, NgxGalleryImage, NgxGalleryAnimation} from '@kolkov/ngx-gallery';
import { Cart } from 'src/app/_models/Cart.model';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  product: Product;
  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];

  constructor(private productService: ProductService, private alertify: AlertifyService,
              private route: ActivatedRoute, private cart: Cart) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      const pro = 'product';
      this.product = data[pro];
    });

    this.galleryOptions = [
      {
          width: '600px',
          height: '400px',
          imagePercent: 100,
          thumbnailsColumns: 4,
          imageAnimation: NgxGalleryAnimation.Slide
      },
      // max-width 800
      // {
      //     breakpoint: 800,
      //     width: '100%',
      //     height: '600px',
      //     imagePercent: 80,
      //     thumbnailsPercent: 20,
      //     thumbnailsMargin: 20,
      //     thumbnailMargin: 20
      // },
      // // max-width 400
      // {
      //     breakpoint: 400,
      //     preview: false
      // }
    ];

    this.galleryImages = this.getImages();
  }

  getImages(){
    const imageUrls = [];
    // tslint:disable-next-line: forin
    for (const photo of this.product.photos){
      imageUrls.push({
        small: photo.url,
        medium: photo.url,
        big: photo.url,
        description: photo.description
      });
    }
    return imageUrls;
  }

  handleAddToCart(){
    this.cart.addProduct(this.product);
    console.log(this.product);
  }
}
