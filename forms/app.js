window.onload = function () {

    var orderForm = document.forms.order


    var qtyFields = orderForm.quantity,
        totalFields = document.getElementsByClassName('item_total'),
        orderTotalField = document.getElementById('order_total');

    var formatMoney = function (value) {
        return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    var calculateTotals = function () {
        ln = qtyFields.length,
            itemTotalMoney = '$0.00',
            orderTotal = 0.00,
            orderTotalMoney = '$0.00';

        for (var i = 0; i < ln; i++) {

            let itemPrice = qtyFields[i].dataset.price || 0.00;
            let itemQty = qtyFields[i].valueAsNumber || 1;
            let itemTotal = itemQty * itemPrice;

            itemTotalMoney = '$' + formatMoney(itemTotal.toFixed(2));
            orderTotal += itemTotal;
            orderTotalMoney = '$' + formatMoney(orderTotal.toFixed(2));


            totalFields[i].value = itemTotalMoney;
            orderTotalField.value = orderTotalMoney;

        }
    };

    var qtyListeners = function () {
        ln = qtyFields.length;
        for (var i = 0; i < ln; i++) {
            qtyFields[i].addEventListener('input', calculateTotals, false);
            qtyFields[i].addEventListener('keyup', calculateTotals, false);
        }
    };

    var doCustomValidity = function (field, msg) {
        if ('setCustomValidity' in field) {
            field.setCustomValidity(msg);
        } else {
            field.validationMessage = msg;
        }
    };

    var validateForm = function () {
        doCustomValidity(orderForm.name, '');
        doCustomValidity(orderForm.password, '');
        doCustomValidity(orderForm.confirm_password, '');
        doCustomValidity(orderForm.card_name, '');

        if (orderForm.name.value.length < 4) {
            doCustomValidity(
                orderForm.name, 'Full Name must be at least 4 characters long'
            );
        }
        if (orderForm.password.value.length < 8) {
            doCustomValidity(
                orderForm.password,
                'Password must be at least 8 characters long'
            );
        }

        if (orderForm.password.value != orderForm.confirm_password.value) {
            doCustomValidity(
                orderForm.confirm_password,
                'Confirm Password must match Password'
            );
        }
        if (orderForm.card_name.value.length < 4) {
            doCustomValidity(
                orderForm.card_name,
                'Name on Card must be at least 4 characters long'
            );
        }

    };

    var styleInvalidForm = function () {
        orderForm.className = 'invalid';
    }

    calculateTotals();
    qtyListeners();
    
    orderForm.addEventListener('input', validateForm);
    orderForm.addEventListener('keyup', validateForm);
    orderForm.addEventListener('invalid', styleInvalidForm, true);

};


