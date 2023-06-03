import { Controller, Get, Post, Put, Patch , Delete} from '@nestjs/common';

@Controller('cats')
export class CatsController {
    constructor(private readonly catsService : CatsController){

    }
    
    // cats / 
    @Get()
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
