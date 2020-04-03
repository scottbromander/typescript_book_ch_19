export type Product = {
  id: number;
  name: string;
  description: string;
  category: string;
  price: number;
};

export class OrderLine {
  constructor(public product: Product, public quantity: number) {}

  get total(): number {
    return this.product.price * this.quantity;
  }
}

export class Order {
  private lines = new Map<number, OrderLine>();

  constructor(initialLines?: OrderLine[]) {
    if (initialLines) {
      initialLines.forEach(orderLine => {
        this.lines.set(orderLine.product.id, orderLine);
      });
    }
  }

  public addProduct(product: Product, quantity: number) {
    if (this.lines.has(product.id)) {
      if (quantity === 0) {
        this.removeProduct(product.id);
      } else {
        this.lines.get(product.id)!.quantity += quantity;
      }
    } else {
      this.lines.set(product.id, new OrderLine(product, quantity));
    }
  }

  public removeProduct(id: number) {
    this.lines.delete(id);
  }

  get orderLines(): OrderLine[] {
    return [...this.lines.values()];
  }

  get productCount(): number {
    return [...this.lines.values()].reduce(
      (total, ol) => (total += ol.quantity),
      0
    );
  }

  get total(): number {
    return [...this.lines.values()].reduce(
      (total, ol) => (total += ol.total),
      0
    );
  }
}
