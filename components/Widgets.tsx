import Image from 'next/image'
import React from 'react'

const people = [
  {
    name: 'Андрій Карапінка',
    img: 'https://i.pinimg.com/564x/77/e8/b7/77e8b7adf44f89980fea3e7c82d328ad.jpg',
  },
  {
    name: 'Остап Когут',
    img: 'https://i.pinimg.com/564x/b5/01/1e/b5011e2e7a44d358a829d8ec5194a9ff.jpg',
  },
  {
    name: 'Лаврін Маїк',
    img: 'https://i.pinimg.com/564x/de/a2/6b/dea26bbdaf67920e725f1fe941f37ab8.jpg',
  },
  {
    name: 'Катерина Оліщук',
    img: 'https://i.pinimg.com/564x/5e/2a/49/5e2a491223c1c00db17e4c59de09a3d4.jpg',
  },
  {
    name: 'Петро Козак',
    img: 'https://i.pinimg.com/564x/b7/10/25/b71025d5fc28cf1d983f3e49314226dd.jpg',
  },
  {
    name: 'Вадим Хортик',
    img: 'https://i.pinimg.com/564x/72/3f/c6/723fc6e26796f0f7e117c89cd4718690.jpg',
  },
  {
    name: 'Андрій Островський',
    img: 'https://i.pinimg.com/736x/04/86/d3/0486d3e270fad76259589d11942df7ce.jpg',
  },
  {
    name: 'Топчак Богдан',
    img: 'https://i.pinimg.com/564x/f5/1e/e5/f51ee58de13a7fde34af7fa2e692dde1.jpg',
  },
]

const Widgets: React.FC = () => {
  return (
    <div className="min-w-[300px] hidden xl:flex flex-col py-5">
      <h1 className="text-gray-500 font-medium text-lg mb-5 px-2">Sponsored</h1>
      <div>
        <h2 className="font-medium text-lg px-2">Contacts</h2>

        <div></div>
      </div>

      <div className="flex flex-col space-y-2 my-2">
        {people.map((p) => (
          <div
            key={p.name}
            className="relative flex items-center space-x-2 cursor-pointer hover:bg-gray-200 py-2 px-2 rounded-lg">
            <Image
              width={30}
              height={30}
              src={p.img}
              alt="avatar"
              className="rounded-full object-cover"
            />
            <h2 className="font-medium">{p.name}</h2>
            <div className="bg-green-500 absolute rounded-full h-2 w-2 bottom-2 left-[20px]"></div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Widgets
