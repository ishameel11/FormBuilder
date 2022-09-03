
        var updated = [];
        var newObj = {};
        var object = {};
        var modalObj = {};
        var index;
        jQuery(function ($) {
            var options = {
                disableFields: ['autocomplete', 'file', 'paragraph', 'hidden', 'number', 'date', 'select', 'header', 'checkbox-group', 'radio-group', 'text', 'textarea'],
                inputSets: [
                    {
                        label: 'First Name',
                        name: 'user',
                        icon: "👨",
                        fields: [
                            {
                                type: 'text',
                                label: 'First-Name',
                                className: 'form-control',
                                name: 'firstname'
                            }
                        ]
                    },
                    {
                        label: 'Last Name',
                        name: 'lastname',
                        icon: "👨",
                        fields: [
                            {
                                type: 'text',
                                label: 'Last-Name',
                                className: 'form-control',
                                name: 'lastname'
                            }
                        ]
                    }
                ],
                onSave: function (evt, formData) {
                    console.log("formbuilder saved");
                    localStorage.setItem('formFill', JSON.stringify(formData));
                    formform();
                }
            };
            $("#build-wrap").formBuilder(options);
        });

        formform();
        var formDataVal;
        function formform() {
            formDataVal = JSON.parse(localStorage.getItem("formFill"));
            dataSet();
        }
        function dataSet() {
            var tableData = JSON.parse(formDataVal);
            var html = "";
            var count = 0;

            tableData.forEach(function (item) {
                count++;
                var asterisk = (item.required) ? "*" : "";

                if (item.type == "text") {
                    html += '<div class="row"><label>' + item.label +
                        '</label><span class="text-danger required-asterisk">' + asterisk +
                        '<span></div><div class="col-lg-8"><input type="' + item.type + '" inputLabel="'
                        + item.label + '" id="' + item.type + count + '" class="' + item.className +
                        ' "  name="' + item.name + '" R1 = "' + item.required + '"/><span class="text-danger error"></span></div>';
                }

                var count1 = 1;
                if (item.type == "button") {
                    html += '<div><button type="' + item.subtype + '" id="' + item.subtype + count1 +
                        '" class="' + item.className + '">' + item.label + '</button></div>';
                    count1++;
                }

            });
            $('#appendForm').html(html);

        }
        function validateNew() {

            $(".error").html("");
            var error = false;
            $('input[type=text][R1=true]').each(function () {
                var type = $(this).attr('type');
                var input = $(this).attr('name');
                var value = $(this).val().trim();
                var label = $(this).attr('inputLabel');
                if (type = "text") {
                    if (value == "") {
                        $(this).next('.error').html(`** ` + label + ` required`)
                        error = true;
                    }
                    else {
                        object[input] = $(this).val();
                    }
                }
            });
            $('#myForm').find('input[type=text]').each(function () {
                var key = $(this).attr('inputLabel');
                var input = $(this).attr('name');
                var values = $(this).val();
                if (values != "") {
                    object[input] = $(this).val();
                }
            });

            if (error == true) {
                return false;
            } else {
                var getData = window.localStorage.setItem("objectVal", JSON.stringify(object));
                let getDataValue = window.localStorage.getItem("objectVal");

                getDataValue = JSON.parse(getDataValue)
                var dataVal = localStorage.getItem("Final");

                updated = JSON.parse(dataVal) ?? [];
                updated.push(getDataValue);
                localStorage.setItem("Final", JSON.stringify(updated));

                for (let i = 1; i <= updated.length; i++) {
                    newObj[i] = getDataValue;
                }
                newObj = "";
                return true;
            }
        };

        //function table() {
        var tableData = (JSON.parse(localStorage.getItem("Final"))) ? JSON.parse(localStorage.getItem("Final")) : {};
        var HTML = '';
        var len = (tableData) ? tableData.length : 0;
        HTML += '<table class="table"><tr><td>#</td>';

        var k = 1;
        for (let j in tableData[0]) {
            HTML += '<td>' + j + '</td>';
        }
        HTML += '<td>Action</td>';
        Object.values(tableData).map(function (val, i) {
            HTML += '<tr id="' + (i) + '"><td>' + (i + 1) + '</td><td>' + val.firstname + '</td><td>' + val.lastname +
                '<td><button  type="button" id="edit' + (i + 1) +
                `" class="editing btn btn-dark" data-bs-toggle="modal" data-bs-target="#exampleModal">Edit</button><button id="delete` + (i + 1) + `" class="delete btn btn-warning">Delete</button></td></tr>`
        });
        HTML += '</table>';
        $('#table').html(HTML);

        $(function () {
            $('table').on('click', 'button.editing', function (value) {
                var tr = value.target.parentNode.parentNode;
                index = tr.cells[0].textContent;
                var firstName = tr.cells[1].textContent;
                var lastname = tr.cells[2].textContent;
                $('h5.modal-title').html(firstName);
                $('#fName').val(firstName);
                $('#lName').val(lastname);
            });
        });

        // SAVE BUTTON
        var newObject = {};
        $('#save').on("click", function () {

            var dataVal = localStorage.getItem("Final");
            dataVal = JSON.parse(dataVal);
            var fName = $('#fName').val();
            var lName = $('#lName').val();
            modalObj["firstname"] = fName;
            modalObj["lastname"] = lName;
            dataVal[index - 1] = modalObj;
            $('.err').html('');
            var err = false;
            localStorage.setItem("Final", JSON.stringify(dataVal));

            var name = $(this).attr('name');

            $(`#modalForm :input[type=text]`).each(function () {

                console.log(name);
                if ($(this).val() == '') {
                    $('#append1').text(`** First Name is required!!`);
                    err = true;
                } if ($(this).val() == '') {
                    $('#append2').text(`** Last Name is required!!`);
                    err = true;
                } else {
                    newObject[$(this).attr('label')] = $(this).val();
                    console.log('1', newObject[$(this).attr('label')]);
                }
            })
            if (err == true) {
                return false;
            }
            location.reload();
        });

        // DELETE BUTTION
        $('table').on('click', 'button.delete', function (value) {

            Swal.fire({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!'
            }).then((result) => {
                if (result.isConfirmed) {
                    Swal.fire(
                        'Deleted!',
                        'Your file has been deleted.',
                        'success'
                    )
                }
            }) 
            // var tr = value.target.parentNode.parentNode;
            // index = tr.cells[0].textContent;
            // var valueId = localStorage.getItem("Final");
            // valueId = JSON.parse(valueId)
            // valueId.splice((index - 1), 1);
            // localStorage.setItem("Final", JSON.stringify(valueId));
            // window.location.reload();
        });