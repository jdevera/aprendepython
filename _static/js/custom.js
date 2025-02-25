// Source: https://github.com/python/python-docs-theme/blob/master/python_docs_theme/static/copybutton.js

$(document).ready(function () {
  /* Add a [>>>] button on the top-right corner of code samples to hide
   * the >>> and ... prompts and the output and thus make the code
   * copyable. */
  var div = $(
    '.highlight-python .highlight,' +
      '.highlight-python3 .highlight,' +
      '.highlight-pycon .highlight,' +
      '.highlight-default .highlight'
  )
  var pre = div.find('pre')

  pre.parent().parent().css('position', 'relative')
  var hide_text = 'Ocultar prompts y salida'
  var show_text = 'Mostrar prompts y salida'

  // create and add the button to all the code blocks that contain >>>
  div.each(function (index) {
    var jthis = $(this)
    if (jthis.find('.gp').length > 0) {
      var button = $('<span class="copybutton">&gt;&gt;&gt;</span>')
      button.attr('title', hide_text)
      button.data('hidden', 'false')
      jthis.prepend(button)
    }
    // tracebacks (.gt) contain bare text elements that need to be
    // wrapped in a span to work with .nextUntil() (see later)
    jthis
      .find('pre:has(.gt)')
      .contents()
      .filter(function () {
        return this.nodeType == 3 && this.data.trim().length > 0
      })
      .wrap('<span>')
  })

  // define the behavior of the button when it's clicked
  $('.copybutton').click(function (e) {
    e.preventDefault()
    var button = $(this)
    if (button.data('hidden') === 'false') {
      // hide the code output
      button.parent().find('.go, .gp, .gt').hide()
      button.next('pre').find('.gt').nextUntil('.gp, .go').css('visibility', 'hidden')
      button.css('text-decoration', 'line-through')
      button.attr('title', show_text)
      button.data('hidden', 'true')
    } else {
      // show the code output
      button.parent().find('.go, .gp, .gt').show()
      button.next('pre').find('.gt').nextUntil('.gp, .go').css('visibility', 'visible')
      button.css('text-decoration', 'none')
      button.attr('title', hide_text)
      button.data('hidden', 'false')
    }
  })

  // Dynamic TOC (Gumshoe)
  // https://github.com/cferdinandi/gumshoe#nested-navigation
  new Gumshoe(".toc-tree a", {
    reflow: true,
    recursive: true,
    navClass: "scroll-current",
    nested: true,
    nestedClass: 'scroll-current'
  });
})
