new Unit.TestCase('EJS',
{
  test_echo: function()
  {
    var ejs = new EJS("<p>\
      <%= 'test' %>\
    </p>");
    this.assertEqual("<p>      test    </p>", ejs.evaluate());
  },

  test_with_linebreaks: function()
  {
    var ejs = new EJS("<p>\n  <%= 'test' %>\n</p>");
    this.assertEqual("<p>\n  test\n</p>", ejs.evaluate());
  },

  test_encode: function()
  {
    var ejs = new EJS("<p><%== '<html>' %></p>");
    this.assertEqual("<p>&lt;html&gt;</p>", ejs.evaluate());
  },

  test_template: function()
  {
    var ejs = new EJS("<p><% var a = \"ab'c'\" %> <%= a %></p>");
    this.assertEqual("<p> ab'c'</p>", ejs.evaluate());
  },

  test_with_context: function()
  {
    var ejs = new EJS("<p><%= a %></p>");
    this.assertEqual("<p>b</p>", ejs.evaluate({a: 'b'}));
  },

  test_with_object_in_context: function()
  {
    var ejs = new EJS("<p><%= a.name %></p>");
    this.assertEqual("<p>b</p>", ejs.evaluate({a: {name: 'b'}}));
  },

  test_erubis_example: function()
  {
    var ejs = new EJS('<%\n\
      var user = "Erubis";\n\
      var list = [\'<aaa>\', \'b&b\', \'"ccc"\'];\n\
    %>\n\
    <html>\n\
     <body>\n\
      <p>Hello <%= user %>!</p>\n\
      <table>\n\
       <tbody>\n\
        <% var i; %>\n\
        <% for (i = 0; i < list.length; i++) { %>\n\
        <tr bgcolor="<%= i % 2 == 0 ? \'#FFCCCC\' : \'#CCCCFF\' %>">\n\
         <td><%= i + 1 %></td>\n\
         <td><%= list[i] %></td>\n\
        </tr>\n\
        <% } %>\n\
       </tbody>\n\
      </table>\n\
     </body>\n\
    </html>');
    
    this.assertEqual("\n\
    <html>\n\
     <body>\n\
      <p>Hello Erubis!</p>\n\
      <table>\n\
       <tbody>\n\
        \n\
        \n\
        <tr bgcolor=\"#FFCCCC\">\n\
         <td>1</td>\n\
         <td><aaa></td>\n\
        </tr>\n\
        \n\
        <tr bgcolor=\"#CCCCFF\">\n\
         <td>2</td>\n\
         <td>b&b</td>\n\
        </tr>\n\
        \n\
        <tr bgcolor=\"#FFCCCC\">\n\
         <td>3</td>\n\
         <td>\"ccc\"</td>\n\
        </tr>\n\
        \n\
       </tbody>\n\
      </table>\n\
     </body>\n\
    </html>", ejs.evaluate());
  }
});
