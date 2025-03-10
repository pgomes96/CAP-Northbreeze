using northbreeze from '../db/schema';

service Main {
    entity Products as projection on northbreeze.Products;
    entity Categories as projection on northbreeze.Categories;
    function TotalStockCount() returns Integer;
}