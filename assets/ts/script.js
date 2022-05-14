(function () {
    var _a;
    const htmlElement = (query) => document.querySelector(query);
    function calcTime(mil) {
        const minutes = Math.floor(mil / 60000);
        const seconds = Math.floor((mil % 60000 / 1000));
        return `${minutes}m e ${seconds}s`;
    }
    function patio() {
        function add(vehicle, saveCar) {
            var _a, _b;
            const row = document.createElement('tr');
            row.innerHTML = `
            <td>${vehicle.name}</td>
            <td>${vehicle.color}</td>
            <td>${vehicle.plate}</td>
            <td>${vehicle.date}</td>
            <td><button class="delete" data-plate="${vehicle.plate}" type="submit"><img src="/assets/svg/icon_remove.svg" alt="icone de lixeira"></button></td>
        `;
            (_a = row.querySelector('.delete')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', function () {
                remove(this.dataset.plate);
            });
            (_b = htmlElement('#patio')) === null || _b === void 0 ? void 0 : _b.appendChild(row);
            if (saveCar)
                save([...read(), vehicle]);
        }
        function save(vehicles) {
            localStorage.setItem('patio', JSON.stringify(vehicles));
        }
        function read() {
            return localStorage.patio ? JSON.parse(localStorage.patio) : [];
        }
        function render() {
            htmlElement('#patio').innerHTML = '';
            const patio = read();
            if (patio.length) {
                patio.forEach((vehicle) => add(vehicle));
            }
        }
        function remove(plate) {
            const { date, name } = read().find((vehicle) => vehicle.plate === plate); //.find((vehicle) => vehicle.plate === plate);
            const time = calcTime(new Date().getTime() - new Date(date).getTime());
            if (!confirm(`O veículo ${name} permaneceu por ${time}. Deseja Encerrar?`))
                return;
            save(read().filter((vehicle) => vehicle.plate !== plate));
            render();
        }
        return { read, add, remove, save, render };
    }
    (_a = htmlElement('#btn')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', () => {
        var _a, _b, _c;
        const name = (_a = htmlElement('#name')) === null || _a === void 0 ? void 0 : _a.value;
        const plate = (_b = htmlElement('#plate')) === null || _b === void 0 ? void 0 : _b.value;
        const color = (_c = htmlElement('#color')) === null || _c === void 0 ? void 0 : _c.value;
        if (!name || !plate || !color) {
            window.alert('Todos os campos devem ser preenchidos');
            return;
        }
        patio().add({ name, plate, color, date: new Date().toISOString() }, true);
    });
    patio().render();
})();
