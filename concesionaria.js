const autos = require("./autos");
const personas = require("./personas");

let concesionaria = {
    autos : autos,
    clientes : personas,
    buscarAuto: function(patente){
        const busqueda = this.autos.find(auto => {
            if(auto.patente == patente){
                return auto;
            }
        })
        if (busqueda == undefined){
            return null;
        }
        return busqueda;
    },
    venderAuto: function(patente){
        let autoEncontrado = this.buscarAuto(patente)
             if(autoEncontrado){
             autoEncontrado.vendido = true
            }
            return autoEncontrado
    },
    autosParaLaVenta: function(){
        let autosEnVenta = autos.filter(function(auto){
            if (auto.vendido == false){
                return auto;
            }
        }); 
        return autosEnVenta 
    },
    autosNuevos: function(){
        let autos0KM = this.autosParaLaVenta().filter(function(auto){
            if (auto.km < 100 ){
                return auto;
            }
        })
        return autos0KM;
    },
    listaDeVentas: function(){
        let autosVendidos = this.autos.filter(auto => {
            if (auto.vendido == true){
                return auto.precio
            } 
        })
        let lista = autosVendidos.map(auto => auto.precio)
        return lista
    },
    totalDeVentas: function(){
        let autosVendidos = this.listaDeVentas().reduce((acumulador, elemento) =>  acumulador + elemento )
        return autosVendidos;
    },
    puedeComprar: function (auto, persona){
        if (persona.capacidadDePagoEnCuotas >= (auto.precio / auto.cuotas) && persona.capacidadDePagoTotal >= auto.precio){
            return true
        }
        return false
    },
    
    autosQuePuedeComprar: function(persona){
        let autosParaVender = concesionaria.autosParaLaVenta();
        let autosQuePuedeComprar = autosParaVender.filter(function(auto){
            return concesionaria.puedeComprar(auto, persona) 
            })
        return autosQuePuedeComprar
    }
}; 


    /* autosQuePuedeComprar: function(persona){
        let autosParaLaVenta = this.autosParaLaVenta()
        let autosQuePuedeComprar = []
        for (let i = 0; i < autosParaLaVenta.length; i++) {
            const auto = autosParaLaVenta[i];
            if (this.puedeComprar(auto, persona) == true){
                autosQuePuedeComprar.push(auto);
                console.log(auto)
            }            
        }
        return autosQuePuedeComprar
    }  */





console.log(concesionaria.autosQuePuedeComprar(personas[0]))
