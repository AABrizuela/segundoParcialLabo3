namespace App
{
    export class Camioneta extends Vehiculo
    {
        cuatroXCuatro:boolean;

        constructor(id:number, marca:string, modelo:string,
                    precio:number, cuatroXCuatro:boolean)
        {
            super(id, marca, modelo, precio);
            this.cuatroXCuatro = cuatroXCuatro;
        }
    }
}