const { performance } = require('perf_hooks');
const fetch = require('node-fetch');

testjs1 = () => {
    return new Promise((resolve) => {
      setTimeout(function(){
        resolve(1)
      },3000)
    })
  }

testjs2 = () => {
    return new Promise((resolve) => {
      setTimeout(
        function(){
          resolve({
              then: new Promise((resolve) => {
                  setTimeout(
                      function(){
                        resolve('done')
                      }, 2000
                  )
              })
          })
        },1000)
    })
  }

testjs3 = () => {
    const data = fetch('http://localhost:3000/api/post')
    .then(response => response.json())
    .then(data => fetch('http://localhost:3000/api/user'))
    .then(response2 => response2.json())
    .then(data2 => console.log(data2));
}

const p = async () => {
    const timeStart = performance.now()
    const [test1, test2] = await Promise.all([testjs1(), testjs2() ,testjs2().then])
    const test3 = await test2.then
    const timeEnd = performance.now() - timeStart
    console.log('timeEnd', timeEnd)
    return [test1, test2, test3]
  }

  p().then(data => {
    console.log(data)
  })

//   testjs3()