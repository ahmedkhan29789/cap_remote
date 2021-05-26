namespace srv;
using  {db}  from '../db/data-model';

service CatalogService {
     
    entity Countries as projection on db.Countries;
}