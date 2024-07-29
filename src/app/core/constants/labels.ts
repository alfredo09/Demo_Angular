import { IMainTitles } from "../interfaces/labels.interface";

export const labels: any = {
  name: 'Nombre',
  code: 'Código',
  description: 'Descripción',
  price: 'Precio',
  stock: 'Stock',
  category: 'Categoría',
  startDate: 'Fecha Inicio',
  endDate: 'Fecha Fin',
  registrationDate: 'Fecha Alta',
  shippingAddress:'Dirección',
  date: 'Fecha de Orden',
  isDelivery: 'Con envío',
  storeName: 'Tienda',
  city: 'Ciudad',
  openingHours: 'Horarios de Atención',
  quantity: 'Cantidad',
  active: 'Disponible',
  productPrice: 'Precio Unitario',
  totalPrice: 'Total',
  storeData: 'Más información'
}

export const titles: any = {
  edit: 'Editar registro',
  create: 'Nuevo registro',
  filter: 'Filtrar por:',
}

export const buttons: any = {
  create: 'Crear',
  edit: 'Editar',
  delete: 'Eliminar',
  info: 'Info',
  save: 'Guardar',
  cancel: 'Cancelar',
  clear: 'Limpiar',
  export: 'Exportar',
  reload: 'Actualizar',
  search: 'Buscar',
  expand: 'Mas información'
}

export const tooltip: any = {
  create: 'Crear',
  edit: 'Editar',
  delete: 'Eliminar',
  info: 'Info',
  clear: 'Limpiar',
  export: 'Exportar',
  reload: 'Actualizar',
}

export const mainTitles: IMainTitles = {
  categories: {
    mainTitle: 'Categorías',
    secondaryTitle: 'Listado de Categorías'
  },
  stores: {
    mainTitle: 'Tiendas',
    secondaryTitle: 'Listado de Tiendas'
  },
  products: {
    mainTitle: 'Productos',
    secondaryTitle: 'Listado de Productos'
  },
  orders: {
    mainTitle: 'Órdenes',
    secondaryTitle: 'Listado de Órdenes'
  },
  detailsOrders: {
    mainTitle: 'Detalles',
    secondaryTitle: 'Listado de Detalles de Órdenes'
  },
}
