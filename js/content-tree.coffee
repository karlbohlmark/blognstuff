require './lib/jquery.jstree'

dnode = require 'dnode'

j = require 'jquery'

initTree = ->
    j('.content-tree').jstree
        plugins : [ "themes", "html_data", "ui", "crrm", "contextmenu", "asdf"],
        themes: {theme: 'apple'},
        contextmenu :
            items:  (node) ->
                submenu = {}
                (submenu[label] = {label, action: (obj) ->  this.create(obj)})  for label, type of contentTypes

                return New:
                    label : 'New',
                    action : -> ,
                    submenu : submenu

contentTypes = {}
dnode.connect( (remote)->
    remote.contentTypes( (types) ->
        contentTypes = types
    )
)

j initTree