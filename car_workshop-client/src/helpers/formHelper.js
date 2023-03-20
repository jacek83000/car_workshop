const formMode = {
    NEW: 'NEW',
    EDIT: 'EDIT'
}

export const formValidationKeys = {
    notEmpty: 'notEmpty',
    len_2_50: 'len_2_50',
    len_5_50: 'len_5_50',
    isEmail: 'isEmail',
    emailInUse: 'emailInUse',
    isNumber: 'isNumber',
    ran_0_10mil: 'ran_0_10mil',
    dateFormat: 'dateFormat',
    dateNotLater: 'dateNotLater',
    ran_0_1mil: 'ran_0_1mil',
    len_max_200: 'len_max_200'

}

export function getValidationErrorKey(error) {
    return error ? `form.validation.message.${error}` : ''
}

export default formMode