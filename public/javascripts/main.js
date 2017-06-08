/* eslint semi: ["error", "never"], no-undef: ["error"] */
/* global $*/
$(() => {
    /* Candy store */
  let store = []

    /* Update Subtotal */
  function updateSubTotal(productRow) {
    const qtr = $(productRow).find('input').first().val()
    let priceTxt = $(productRow).find('.price').first().text()

        // Clean price
    priceTxt = priceTxt.trim()
    priceTxt = priceTxt.replace('$', '')
    const price = parseFloat(priceTxt)

        /* Update subtotal */
    const subtotal = $(productRow).find('.subtotal').first()
    const totalPrice = qtr * price
    subtotal.text(`$${totalPrice.toFixed(2)}`)
  }

    /* Delete product */
  function deleteProduct(productRow) {
    $(productRow).remove()
  }

    /* Create product */
  function createProduct() {
    const name = $("input[name='name']").val()
    const price = $("input[name='price']").val()

          // Check input
    if (name.length === 0) {
      $('.create .name .form-group').addClass('has-error')
      return
    }
    $('.create .name .form-group').removeClass('has-error')

    if (price.length === 0 || price === '0') {
      $('.create .price .form-group').addClass('has-error')
      return
    }
    $('.create .price .form-group').removeClass('has-error')

          // Setup template
    let tpl = $('#productRowTpl').html()
    tpl = tpl.replace('{{Name}}', name)
    tpl = tpl.replace('{{Price}}', price)

          // Append the row
    $('#cart > div').append(tpl)

          // Clear inputs
    $("input[name='name']").val('')
    $("input[name='price']").val('')
  }

    /* Create product Row */
  function createProductRow(candy) {
      // Setup template
    let tpl = $('#productRowTpl').html()
    tpl = tpl.replace('{{Id}}', candy.id)
    tpl = tpl.replace('{{Name}}', candy.name)
    tpl = tpl.replace('{{Color}}', candy.color)
    tpl = tpl.replace('{{Price}}', candy.price)

      // Append the row
    $('#cart > div').append(tpl)
  }

  function showCreateForm() {
    $('#editform').modal('show')
    $('#editform').addClass('createForm')
    $('.modal-title').text('Create Candy')
    $('button.submit').text('Create')
  }

    // Show update form */
  function showUpdateForm(candy) {
    $('#editform').modal('show')
    $('#editform').addClass('updateForm')

    $('#editform #name').val(candy.name)
    $('#editform #color').val(candy.color)
    $('#editform #price').val(candy.price)
    $('#editform #id').val(candy.id)
  }

    /* Reset modal */
  function resetModal() {
    $('.updateForm #id').val('')
    $('.updateForm #name').val('')
    $('.updateForm #color').val('')
    $('.updateForm #price').val('')
    $('#editform').removeClass('updateForm')
  }

    // Create candy on server
  function createProductAjax() {
    const candy = {}
    candy.id = $('.createForm #id').val()
    candy.name = $('.createForm #name').val()
    candy.color = $('.createForm #color').val()
    candy.price = $('.createForm #price').val()

    $.ajax({
      method: 'POST',
      url: '/api',
      data: candy
    }).done((candy) => {
      createProductRow(candy)
      $(`[data-id=${candy.id}]`).hide()
      $('#editform').modal('hide')
      $(`[data-id=${candy.id}]`).fadeIn()
    })
  }

    // Update candy on server
  function updateProductAjax() {
    const candy = {}
    candy.id = $('.updateForm #id').val()
    candy.name = $('.updateForm #name').val()
    candy.color = $('.updateForm #color').val()
    candy.price = $('.updateForm #price').val()

    $.ajax({
      method: 'PUT',
      url: '/api',
      data: candy
    }).done((data) => {
      resetModal()

            // Setup template
      let tpl = $('#productRowTpl').html()
      tpl = tpl.replace('{{Id}}', candy.id)
      tpl = tpl.replace('{{Name}}', candy.name)
      tpl = tpl.replace('{{Color}}', candy.color)
      tpl = tpl.replace('{{Price}}', candy.price)

            // Hide
      $('#editform').modal('hide')

      $(`[data-id=${candy.id}]`).fadeOut(() => {
        $(`[data-id=${candy.id}]`).replaceWith(tpl)
        $(`[data-id=${candy.id}]`).fadeIn()
      })

        //    $('[data-id=' + candy.id + ']').replaceWith(tpl);
        //    $('[data-id=' + candy.id + ']').fadeIn();
    })
  }

    /* Calculate grand total */
  function calculateGrandTotal() {
    const subtotalElements = $('.subtotal')
    let total = 0

    subtotalElements.each(function(index) {
        // Clean price
      let subtotalTxt = $(this).text()
      subtotalTxt = subtotalTxt.trim()
      subtotalTxt = subtotalTxt.replace('$', '')
      const subtotal = parseFloat(subtotalTxt)
      total += subtotal
    })

      // Update
    $('#grandTotal').text(total.toFixed(2))
  }

    /* Attach event listeners */
  $('#cart').on('keyup', '*', (event) => {
    const productRow = $(event.target).parents('.product')[0]
    updateSubTotal(productRow)
    calculateGrandTotal()
  })

  $('#cart').on('click', '.delete', (event) => {
    const productRow = $(event.target).parents('.product')[0]
    deleteProduct(productRow)
    calculateGrandTotal()
  })

  $('.create').on('click', '.createProduct', (event) => {
    showCreateForm()
  })

  $('#cart').on('click', '.update', (event) => {
    const productRow = $(event.target).parents('.product')[0]
    const id = $(productRow).data('id')
    const candy = store.find(item => item.id == id)
    showUpdateForm(candy)
  })

  $('body').on('click', '.updateForm .submit', () => {
    updateProductAjax()
  })

  $('body').on('click', '.createForm .submit', () => {
    createProductAjax()
  })

    /* init store */
  $.ajax({
    method: 'GET',
    url: '/API'
  })
    .done((data) => {
      store = data
      data.forEach((candy) => {
        createProductRow(candy)
      })
    })

  $('#editform').on('shown.bs.modal', () => {
    $('#name').focus()
  })
})
