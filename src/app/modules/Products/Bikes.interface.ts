interface IBike {
  name: string
  image: string
  brand: string
  price: number
  category: 'Mountain' | 'Road' | 'Hybrid' | 'Electric'
  description: string
  quantity: number
  inStock: boolean
}

export default IBike
