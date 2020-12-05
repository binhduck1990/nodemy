const { performance } = require('perf_hooks');
const fetch = require('node-fetch');
const e = require('express');

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

testApi1 = async () => {
    const response = await fetch('http://localhost:3000/api/post')
    const posts = await response.json()
    return posts
}

testApi2 = async () => {
    const response = await fetch('http://localhost:3000/api/user')
    const users = await response.json()
    return users
}

const testPromise = async () => {
    const timeStart = performance.now()
    const [test1, test2, test3] = await Promise.all([testjs1(), testjs2() ,testjs2().then])
    const timeEnd = performance.now() - timeStart
    console.log('timeEnd', timeEnd)
    return [test1, test2, test3]
  }

  // testPromise().then(data => {
  //   console.log(data)
  // })

  const testApi = async () => {
    const timeStart = performance.now()
    // const test1 = await testApi1()
    // const test2 = await testApi2()
    const [test1, test2] = await Promise.all([testApi1(), testApi2()])
    const timeEnd = performance.now() - timeStart
    console.log(timeEnd)
    return {
        posts: test1,
        users: test2
    }
  }

  // testApi().then(data => {
  //     console.log('123')
  // })

  const fetchApiUser = () => {
    return fetch('http://localhost:3000/api/user')
    .then(response => response.json())
    .then(data => {
      return data
    })
  }

  const fetchApiPost = () => {
    return fetch('http://localhost:3000/api/post')
    .then(response => response.json())
    .then(data => {
      return data
    })
  }

  const data = Promise.all([fetchApiUser(), fetchApiPost()]).then((value) => {
    return {
      users: value[0],
      posts: value[1]
    }
  })

  data.then(value => console.log(value))