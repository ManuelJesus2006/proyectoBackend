export class Characteristics {
  // Procesadores / RAM
  speed?: string;
  max_speed?: string;
  voltage?: string;

  // Gráficas
  memory?: string;
  boost_clock?: string;
  tdp?: string;

  // Placas Base
  socket?: string;
  chipset?: string;
  form_factor?: string;

  // RAM
  type?: string;

  // Almacenamiento
  interface?: string;
  speed_read?: string;
  speed_write?: string;
  rpm?: string;
  cache?: string;

  // Refrigeración
  fans?: string;
  fan?: string;
  noise?: string;
  height?: string;

  // Fuentes
  wattage?: string;
  efficiency?: string;
  modular?: string;
}

export class Producto {
  _id?: string;

  id: number;

  business: string;

  name: string;

  type: string;

  release_date: Date;

  price: number;

  imageUrl: string;

  update_date: Date;

  creation_date: Date;

  characteristics: Characteristics;
}