import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../../libs/database/src/prisma.service';
import { CreateListingDto } from './dto/create-listing.dto';
import { UpdateListingDto } from './dto/update-listing.dto';
import { ListingQueryDto } from './dto/listing-query.dto';

@Injectable()
export class ListingsService {
  constructor(private prisma: PrismaService) {}

  async create(createListingDto: CreateListingDto) {
    return this.prisma.service.create({
      data: createListingDto,
      include: {
        provider: {
          include: {
            user: true,
          },
        },
        category: {
          include: {
            translations: true,
          },
        },
      },
    });
  }

  async findAll(query: ListingQueryDto) {
    const {
      limit = 10,
      offset = 0,
      includeProvider,
      includeCategory,
      ...filters
    } = query;

    const where: any = {};
    
    if (filters.categoryId) {
      where.categoryId = filters.categoryId;
    }
    
    if (filters.providerId) {
      where.providerId = filters.providerId;
    }
    
    if (filters.status) {
      where.status = filters.status;
    }

    const include: any = {};
    if (includeProvider) {
      include.provider = {
        include: {
          user: true,
        },
      };
    }
    if (includeCategory) {
      include.category = {
        include: {
          translations: true,
        },
      };
    }

    const [data, total] = await Promise.all([
      this.prisma.service.findMany({
        where,
        include,
        take: Number(limit),
        skip: Number(offset),
        orderBy: {
          createdAt: 'desc',
        },
      }),
      this.prisma.service.count({ where }),
    ]);

    return {
      data,
      pagination: {
        total,
        page: Math.floor(offset / limit) + 1,
        limit: Number(limit),
        totalPages: Math.ceil(total / limit),
        hasNext: offset + limit < total,
        hasPrev: offset > 0,
      },
    };
  }

  async getStats() {
    const total = await this.prisma.service.count();
    const active = await this.prisma.service.count({
      where: { status: 'ACTIVE' },
    });
    const inactive = await this.prisma.service.count({
      where: { status: 'INACTIVE' },
    });

    const avgPriceResult = await this.prisma.service.aggregate({
      where: {
        price: { not: null },
      },
      _avg: {
        price: true,
      },
    });

    return {
      total,
      active,
      inactive,
      averagePrice: Number(avgPriceResult._avg.price) || 0,
      byCategory: {}, // TODO: Implement category breakdown
      byProvider: {}, // TODO: Implement provider breakdown
    };
  }

  async findOne(id: string) {
    const service = await this.prisma.service.findUnique({
      where: { id },
      include: {
        provider: {
          include: {
            user: true,
          },
        },
        category: {
          include: {
            translations: true,
          },
        },
      },
    });

    if (!service) {
      throw new NotFoundException(`Listing with ID ${id} not found`);
    }

    return service;
  }

  async update(id: string, updateListingDto: UpdateListingDto) {
    try {
      return await this.prisma.service.update({
        where: { id },
        data: updateListingDto,
        include: {
          provider: {
            include: {
              user: true,
            },
          },
          category: {
            include: {
              translations: true,
            },
          },
        },
      });
    } catch (error) {
      throw new NotFoundException(`Listing with ID ${id} not found`);
    }
  }

  async remove(id: string) {
    try {
      await this.prisma.service.delete({
        where: { id },
      });
    } catch (error) {
      throw new NotFoundException(`Listing with ID ${id} not found`);
    }
  }
}