-- CreateTable
CREATE TABLE "debts" (
    "id" SERIAL NOT NULL,
    "description" TEXT NOT NULL,
    "date_exp" TIMESTAMP(3) NOT NULL,
    "value" DOUBLE PRECISION NOT NULL,
    "status_pag" BOOLEAN NOT NULL DEFAULT false,
    "id_user" INTEGER NOT NULL,

    CONSTRAINT "debts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "entrys" (
    "id" SERIAL NOT NULL,
    "description" TEXT NOT NULL,
    "date_in" TIMESTAMP(3) NOT NULL,
    "value" DOUBLE PRECISION NOT NULL,
    "id_user" INTEGER NOT NULL,

    CONSTRAINT "entrys_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "products" (
    "id" SERIAL NOT NULL,
    "description" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "category" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,

    CONSTRAINT "products_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "products_description_key" ON "products"("description");

-- CreateIndex
CREATE UNIQUE INDEX "products_price_key" ON "products"("price");

-- CreateIndex
CREATE UNIQUE INDEX "products_category_key" ON "products"("category");

-- CreateIndex
CREATE UNIQUE INDEX "products_quantity_key" ON "products"("quantity");

-- AddForeignKey
ALTER TABLE "debts" ADD CONSTRAINT "debts_id_user_fkey" FOREIGN KEY ("id_user") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "entrys" ADD CONSTRAINT "entrys_id_user_fkey" FOREIGN KEY ("id_user") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
