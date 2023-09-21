import { Controller, Get, Logger } from '@nestjs/common'

import { SectionEntity } from '../entities/Section'
import { SectionsService } from './sections.service'

@Controller('sections')
export class SectionsController {
  private readonly logger = new Logger(SectionsController.name)

  constructor(private sectionsService: SectionsService) {}

  @Get()
  getAllSections(): Promise<SectionEntity[]> {
    this.logger.log('GET /sections')

    return this.sectionsService.findAll()
  }
}
