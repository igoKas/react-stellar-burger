export const statusConvert = status => {
    return status === 'done' ?
    { text: 'Выполнен', color: '#00CCCC' } :
    status === 'pending' ?
    { text: 'Готовится', color: '#FFFFFF' } :
    { text: 'Создан', color: '#FFFFFF' };
}