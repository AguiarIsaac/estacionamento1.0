interface Vehicle {
    name: string,
    plate: string,
    color: string,
    date: Date | string
}

(function() {
     const htmlElement = ( query: string ): HTMLInputElement | null => document.querySelector(query);

     function calcTime(mil: number) {
         const minutes = Math.floor(mil / 60000);
         const seconds = Math.floor((mil % 60000 / 1000));

         return `${minutes}m e ${seconds}s`
     }

     function patio(){

        function add(vehicle: Vehicle, saveCar?: Boolean) {
            const row = document.createElement('tr');
            
            row.innerHTML = `
            <td>${vehicle.name}</td>
            <td>${vehicle.color}</td>
            <td>${vehicle.plate}</td>
            <td>${vehicle.date}</td>
            <td><button class="delete" data-plate="${vehicle.plate}" type="submit"><img src="/assets/svg/icon_remove.svg" alt="icone de lixeira"></button></td>
        `;  
            row.querySelector('.delete')?.addEventListener('click', function() {
                remove(this.dataset.plate)
            })
            
            htmlElement('#patio')?.appendChild(row)

            if (saveCar) save([...read(), vehicle])
        }
        
        function save(vehicles: Vehicle[]) {
            localStorage.setItem('patio', JSON.stringify(vehicles))
        }

        function read() : Vehicle[] {
            return localStorage.patio ? JSON.parse(localStorage.patio) : []
        }

        function render(){
            htmlElement('#patio')!.innerHTML = ''
            const patio = read()

            if (patio.length) {
                patio.forEach((vehicle) => add(vehicle));
            }
        }

        function remove(plate: string) {
            const {date, name} = read().find((vehicle) => vehicle.plate === plate) //.find((vehicle) => vehicle.plate === plate);
            const time = calcTime(new Date().getTime() - new Date(date).getTime());

            if(!confirm(`O veículo ${name} permaneceu por ${time}. Deseja Encerrar?`))
            return;

            save(read().filter((vehicle) => vehicle.plate !== plate));
            render();

        }

        return {read, add, remove, save, render}
     }

     htmlElement('#btn')?.addEventListener('click', () => {
         const name = htmlElement('#name')?.value;
         const plate = htmlElement('#plate')?.value;
         const color = htmlElement('#color')?.value;

         if(!name || !plate || !color) {
             window.alert('Todos os campos devem ser preenchidos');
             return;
         }

         patio().add({ name, plate, color, date: new Date().toISOString() }, true)
     })

     patio().render();
})();