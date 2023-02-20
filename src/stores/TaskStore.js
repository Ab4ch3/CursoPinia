import { defineStore } from "pinia"; //Definimos que vamos a usar el store de Pinia

// Puedes nombrar el valor de retorno de `defineStore()` como quieras,
// pero es mejor usar el nombre de la tienda y rodearlo con `use`
// y `Store` (ej. `useUserStore`, `useCartStore`, `useProductStore`)
// el primer argumento es un id único de la tienda en tu aplicación
// Exportamos la store , con su nombre y las acciones de la cuales podemos realizar uso luego
export const useTaskStore = defineStore("taskStore", {
  state: () => ({
    //state Viene siendo la data de la tienda
    tasks: [],
    title: "Miguel Task",
    loading: false,
  }),
  // los getter son como las computadas , siempre returna un valor o una parte especifica se necesite
  getters: {
    favs() {
      //nos retornara solo los que sean favorito
      return this.tasks.filter((t) => t.isFav);
    },
    favCount() {
      // Nos retornara la cantidad de tareas favoritas que tenemos
      return this.tasks.reduce((p, c) => {
        return c.isFav ? p + 1 : p;
      }, 0);
    },
    // Usando arrow funcion , lo usamos asi cuando necestiamos acceder al state
    totalCount: (state) => {
      return state.tasks.length;
    },
  },
  // las acciones son los metodos o la funciones que se pueden realizar en este store y son las que modifican el state
  actions: {
    async getTasks() {
      this.loading = true;
      const res = await fetch("http://localhost:3000/tasks");
      const data = await res.json();

      this.tasks = data;
      this.loading = false;
    },
    async addTask(task) {
      // Para generar una nueva tarea se recibe un task , y en este caso se pushea hacia el state, mediante se esta accediendo por el this.
      this.tasks.push(task);
      const res = await fetch("http://localhost:3000/tasks", {
        method: "POST",
        body: JSON.stringify(task),
        headers: { "Content-type": "application/json" },
      });

      if (res.error) {
        console.log(res.error);
      }
    },
    async deleteTask(id) {
      //Va a buscar al elemento dentro de task y va traer todos los restantes excepto el id que le enviamos
      this.tasks = this.tasks.filter((t) => {
        return t.id !== id;
      });

      const res = await fetch("http://localhost:3000/tasks/" + id, {
        method: "DELETE",
      });

      if (res.error) {
        console.log(res.error);
      }
    },
    async toggleFav(id) {
      const task = this.tasks.find((t) => t.id === id);
      task.isFav = !task.isFav;

      const res = await fetch("http://localhost:3000/tasks/" + id, {
        method: "PATCH",
        body: JSON.stringify({ isFav: task.isFav }),
        headers: { "Content-type": "application/json" },
      });

      if (res.error) {
        console.log(res.error);
      }
    },
  },
});
