namespace App
{
    export class Auto extends Vehiculo
    {
        cantPuertas:number;

        constructor(id:number, marca:string, modelo:string,
                    precio:number, cantPuertas:number)
        {
            super(id, marca, modelo, precio);
            this.cantPuertas = cantPuertas;
        }
    }
}

