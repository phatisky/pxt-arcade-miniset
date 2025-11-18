
namespace MiniSet {
    export class miniSet<T> {
        private table: { [key: string]: uint8 };
        private items: T[];

        constructor(list?: T[]) {
            this.init(list);
        }

        init(ls?: T[]): void {
            this.table = {};
            this.items = [];
            if (ls) for (const v of ls) this.add(v);
        }

        private key(value: T): string {
            return (
                typeof value === "object"
                    ? JSON.stringify(value)
                    : convertToText(value)
            ) as string;
        }

        add(value: T): void {
            const k = this.key(value);
            if (!this.table[k]) {
                this.table[k] = 0xf;
                this.items.push(value);
            }
        }

        has(value: T): boolean {
            return !!this.table[this.key(value)];
        }

        del(value: T): boolean {
            const k = this.key(value);
            if (!this.table[k]) return false;

            delete this.table[k];
            this.items = this.items.filter(v => this.key(v) !== k);
            return true;
        }

        clear(): void {
            this.init();
        }

        toArray(start?: number, end?: number): T[] {
            return this.items.slice(start, end);
        }

        get size(): number {
            return this.items.length;
        }
    }
}

let s = new MiniSet.miniSet([10, 20, 10, 30]);

game.splash("s.toArray() :", s.toArray());  // [10, 20, 30]
game.splash(`s.size: ${s.size}`);           // 3
game.splash(`s.has(10): ${s.has(10)}`);     // true
game.splash(`s.has(1): ${s.has(1)}`);       // false
s.del(30);
game.splash("s.del(30):", s.toArray())      // [10, 20]

