

// controller.js will apply service uses DI
app.get('/api/infos', function (req, res) {
    const {_limit,_sort,_start,name_contains} = req.query;
    const ret = infoService.getInfo({_limit,_sort,_start,name_contains} );
    res.json(ret);
});

// service.js will apply repo uses DI
function getInfo({_limit,_sort,_start,name_contains} ){
   return repo.getInfo({_limit,_sort,_start,name_contains} );
}

// repo.js that abstract the DB layer; use ODM or ORM 
async function getBlog({_limit,_sort,_start,name_contains}){
   let sql = `select * from infoTabe order by _sort.join("") limit ${_limit} offset ${_start} `;
   name_contains ? sql += `where name LIKE %${name_contains}%' : '';
   const ret1 = await DB.query(sql);
   sql = sql.replace("*", "count(*)");
   const ret2 = await DB.query(sql);
   cont [items, count] = await Promise.All([ret1, ret2]);
   return {items, count};
}


