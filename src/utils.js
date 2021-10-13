export const getRandomId = () => {
  return (Math.random()*10000).toFixed();
}

export const formatDate = (date) => {
  const options = { year: 'numeric', month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric'};
  return date.toLocaleString('ru', options);
}