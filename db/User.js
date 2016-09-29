module.exports = {
  create: {
    url : "create/user",
    handle : function(message, auth){
      if(!auth()) return;

    }
  },
  update: {
    url : "update/user",
    handle : function(message, auth){
      if(!auth()) return;

    }
  },
  read: {
    url : "read/user",
    handle : function(message, auth){
      if(!auth()) return;

    }
  },
  delete: {
    url : "delete/user",
    handle : function(message, auth){
      if(!auth()) return;
    }
  }
}
