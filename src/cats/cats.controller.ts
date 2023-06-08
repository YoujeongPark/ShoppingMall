import { Controller, Get, Post, Put, Patch , Delete, UseFilters} from '@nestjs/common';
import { HttpExceptionFilter } from 'src/common/exceptions/http-exception.filter';

@Controller('cats')
@UseFilters(HttpExceptionFilter) // 위에다가 다 사용하면 전체 적용 
export class CatsController {
    constructor(private readonly catsService : CatsController){

    }    
    // cats / 
    @Get()
    @UseFilters(HttpExceptionFilter)
    getAllCat(){
        return 'all cat';
    }

    @Get(':id')
    getOneCat(){
        return 'one cat';
    }

    @Post()
    createCat(){
        return 'create cat';
    }

    @Put(':id')
    updateCat(){
        return 'update cat';
    }

    @Patch(':id')
    updatePartialCat(){
        return; 
    }

    @Delete(':id')
    deleteCat(){
        return 'delete service'; 
    }

    
}
