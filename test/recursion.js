const arr = ['City1', 'City2', 'City3', 'City4'];

const randomMilisec = (Math.floor(Math.random() * 5) + 2) * 1000;

const recFunc = (i) => {
  console.log(arr[i])
  i -= 1;
  if (i >= 0) {
    setTimeout(() => {
      recFunc(i);
    }, randomMilisec);
  };
};

recFunc(arr.length - 1);