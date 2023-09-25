import { Controller, Get, Logger, Patch, Body } from '@nestjs/common';
import { SectionEntity } from '../entities/Section';
import { SectionsService } from './sections.service';

@Controller('sections')
export class SectionsController {
  private readonly logger = new Logger(SectionsController.name);

  constructor(private readonly sectionsService: SectionsService) { }

  @Get()
  getAllSections(): Promise<SectionEntity[]> {
    return this.sectionsService.findAll();
  }

  @Patch('/reorder')
  async reorderCards(@Body() data: { sectionId: number; sourceIndex: number; destinationIndex: number }): Promise<SectionEntity> {
    return await this.sectionsService.reorderCards(data.sectionId, data.sourceIndex, data.destinationIndex);
  }
}