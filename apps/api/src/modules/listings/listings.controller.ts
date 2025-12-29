import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  Query,
  HttpCode,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { ListingsService } from './listings.service';
import { CreateListingDto } from './dto/create-listing.dto';
import { UpdateListingDto } from './dto/update-listing.dto';
import { ListingQueryDto } from './dto/listing-query.dto';
import { JwtAuthGuard } from '../auth/auth.guard';
import { RolesGuard, Roles } from '../auth/roles.guard';
import { UserRole } from '@prisma/client';

@Controller('listings')
@UseGuards(JwtAuthGuard, RolesGuard)
export class ListingsController {
  constructor(private readonly listingsService: ListingsService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @Roles(UserRole.ADMIN)
  async create(@Body() createListingDto: CreateListingDto) {
    return this.listingsService.create(createListingDto);
  }

  @Get()
  @Roles(UserRole.ADMIN, UserRole.PROVIDER, UserRole.CLIENT)
  async findAll(@Query() query: ListingQueryDto) {
    return this.listingsService.findAll(query);
  }

  @Get('stats')
  @Roles(UserRole.ADMIN)
  async getStats() {
    return this.listingsService.getStats();
  }

  @Get(':id')
  @Roles(UserRole.ADMIN, UserRole.PROVIDER, UserRole.CLIENT)
  async findOne(@Param('id') id: string) {
    return this.listingsService.findOne(id);
  }

  @Put(':id')
  @Roles(UserRole.ADMIN)
  async update(
    @Param('id') id: string,
    @Body() updateListingDto: UpdateListingDto,
  ) {
    return this.listingsService.update(id, updateListingDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @Roles(UserRole.ADMIN)
  async remove(@Param('id') id: string) {
    return this.listingsService.remove(id);
  }
}