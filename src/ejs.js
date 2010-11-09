function EJS(template) {
  this.template = template;
}

EJS.prototype =
{
  compile: function()
  {
    var tmpl  = this.template.replace(/\n/g, '&br;');
    var parts = tmpl.split(/(<%.*?%>)/g);
    var buf   = ["var _buf = '';"], part, m;
    
    for (var i=0, len=parts.length; i<len; i++)
    {
      part = parts[i];

      if (m = part.match(/<%([=#]*)(.+?)%>/))
      {
        m[2] = m[2].replace(/&br;/g, "\n");
        
        switch (m[1])
        {
          case '=':
            buf.push("_buf += " + m[2].trim() + ";");
          continue;
          
          case '==':
            buf.push("_buf += this._encode(" + m[2].trim() + ");");
          continue;
          
          case '#':
          continue;
          
          default:
            buf.push(m[2].trim());
          continue
        }
      }
      
      part = part.replace(/&br;/g, "\n");
      buf.push("_buf += '" + this.escape(part) + "';");
    }
    
    this.source = buf.join("\n");
  },

  evaluate: function(context)
  {
    if (!this.source) {
      this.compile();
    }
    
    var code = this.source;
    
    for (var n in (context || {})) {
      code = "var " + n + " = " + JSON.stringify(context[n]) + ";\n" + code;
    }
    
    return this._eval(code);
  },

  _eval: function(_code)
  {
    eval(_code);
    return _buf;
  },

  escape: function(str) {
    return str.replace(/'/g, "\\'").replace(/\n/g, "\\n\\\n");
  },

  _encode: function(str) {
    return str.replace('<', '&lt;').replace('>', '&gt;');
  }
}
