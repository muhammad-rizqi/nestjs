import { ProductService } from './product.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  addProduct(
    @Body('title') title: string,
    @Body('description') description: string,
    @Body('price') price: number,
  ): any {
    const generatedId = this.productService.insertProduct(
      title,
      description,
      price,
    );
    return { id: generatedId };
  }

  @Get()
  getAllProduct() {
    return { products: this.productService.getProducts() };
  }

  @Get(':id')
  getProduct(@Param('id') id: string) {
    return { product: this.productService.getSingleProduct(id) };
  }

  @Patch(':id')
  updateProduct(
    @Param('id') id: string,
    @Body('title') title: string,
    @Body('description') description: string,
    @Body('price') price: number,
  ) {
    return {
      product: this.productService.updateProduct(id, title, description, price),
    };
  }

  @Delete(':id')
  deleteProduct(@Param('id') id: string) {
    return { product: this.productService.deleteProduct(id) };
  }
}
