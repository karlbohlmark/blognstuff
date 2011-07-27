jade  = require 'jade'
j     = require 'jquery'
dnode = require 'dnode'

require './content-tree.coffee'

j( ->
    j('[type="template/jade"]').each( ->
        j(this).replaceWith( jade.render(this.innerHTML, { locals: model}) )
    )
)



