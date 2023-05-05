import * as Yup from 'yup';

export const validateInvoiceForm = (form) => {
    const schema = Yup.object().shape({
        id: Yup.string().required(),
        streetAddress: Yup.string().required(),
        city: Yup.string().required(),
        postCode: Yup.string().required(),
        country: Yup.string().required(),
        clientName: Yup.string().required(),
        clientEmail: Yup.string().email().required(),
        clientStreetAddress: Yup.string().required(),
        clientCity: Yup.string().required(),
        clientCountry: Yup.string().required(),
        clientPostCode: Yup.string().required(),
        invoiceDate: Yup.date().required(),
        paymentTerms: Yup.number().required(),
        description: Yup.string().required(),
        statusText: Yup.string().required(),
        paid: Yup.boolean().required(),
        showMarkBtn: Yup.boolean().required(),
        addItems: Yup.array().of(
            Yup.object().shape({
                itemname: Yup.string().required(),
                quantity: Yup.number().min(1).required(),
                price: Yup.number().min(0).required(),
            })
        ),
        netTotal: Yup.number().min(0).required(),
    });

    schema.validate(form)
        .then((valid) => console.log(valid))
        .catch((error) => console.log(error));

}
