// import React, { useState } from 'react'
// import { useDispatch } from 'react-redux'
// import { createShortUrl } from '../../api/urls'
// import Button from '../UI/Button'

// const CreateLinkForm = ({ onSuccess }) => {
//   const [formData, setFormData] = useState({
//     originalUrl: '',
//     customAlias: '',
//     expiresAt: ''
//   })
//   const [error, setError] = useState(null)
//   const [isLoading, setIsLoading] = useState(false)
//   const [shortUrl, setShortUrl] = useState()
//   const dispatch = useDispatch()

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value
//     })
//   }

//   const handleSubmit = async (e) => {
//     e.preventDefault()
//     setIsLoading(true)
//     setError(null)
    
//     try {
//       const result = await createShortUrl(formData)
//       console.log(result.data.shortUrl);
//       setShortUrl(result.data.shortUrl);
//       onSuccess(result)
//       setFormData({
//         originalUrl: '',
//         customAlias: '',
//         expiresAt: ''
//       })
//     } catch (err) {
//       setError(err.message || 'Failed to create short URL')
//     } finally {
//       setIsLoading(false)
//     }
//   }

//   return (
//     <div className="bg-white p-6 rounded-lg shadow-md">
//       <h2 className="text-xl font-semibold mb-4">Create Short Link</h2>
//       {error && (
//         <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
//           {error}
//         </div>
//       )}
//       <form onSubmit={handleSubmit}>
//         <div className="mb-4">
//           <label htmlFor="originalUrl" className="block text-sm font-medium text-gray-700 mb-1">
//             Original URL
//           </label>
//           <input
//             type="url"
//             id="originalUrl"
//             name="originalUrl"
//             required
//             className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//             placeholder="https://example.com"
//             value={formData.originalUrl}
//             onChange={handleChange}
//           />
//         </div>
        
//         <div className="mb-4">
//           <label htmlFor="customAlias" className="block text-sm font-medium text-gray-700 mb-1">
//             Custom Alias (optional)
//           </label>
//           <input
//             type="text"
//             id="customAlias"
//             name="customAlias"
//             className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//             placeholder="my-custom-alias"
//             value={formData.customAlias}
//             onChange={handleChange}
//           />
//         </div>
        
//         <div className="mb-4">
//           <label htmlFor="expiresAt" className="block text-sm font-medium text-gray-700 mb-1">
//             Expiration Date (optional)
//           </label>
//           <input
//             type="date"
//             id="expiresAt"
//             name="expiresAt"
//             className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//             value={formData.expiresAt}
//             onChange={handleChange}
//           />
//         </div>
        
//         <Button type="submit" disabled={isLoading} className="w-full">
//           {isLoading ? 'Creating...' : 'Create Short Link'}
//         </Button>
//       </form>
//     </div>
//   )
// }

// export default CreateLinkForm


import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { createShortUrl } from '../../api/urls'
import Button from '../UI/Button'

const CreateLinkForm = ({ onSuccess }) => {
  const [formData, setFormData] = useState({
    originalUrl: '',
    customAlias: '',
    expiresAt: ''
  })
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const dispatch = useDispatch()

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)
    
    try {
      const result = await createShortUrl(formData)
      onSuccess(result.data) // Pass the entire response data
      setFormData({
        originalUrl: '',
        customAlias: '',
        expiresAt: ''
      })
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Failed to create short URL')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Create Short Link</h2>
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="originalUrl" className="block text-sm font-medium text-gray-700 mb-1">
            Original URL
          </label>
          <input
            type="url"
            id="originalUrl"
            name="originalUrl"
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            placeholder="https://example.com"
            value={formData.originalUrl}
            onChange={handleChange}
          />
        </div>
        
        <div className="mb-4">
          <label htmlFor="customAlias" className="block text-sm font-medium text-gray-700 mb-1">
            Custom Alias (optional)
          </label>
          <input
            type="text"
            id="customAlias"
            name="customAlias"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            placeholder="my-custom-alias"
            value={formData.customAlias}
            onChange={handleChange}
          />
        </div>
        
        <div className="mb-4">
          <label htmlFor="expiresAt" className="block text-sm font-medium text-gray-700 mb-1">
            Expiration Date (optional)
          </label>
          <input
            type="date"
            id="expiresAt"
            name="expiresAt"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            value={formData.expiresAt}
            onChange={handleChange}
          />
        </div>
        
        <Button type="submit" disabled={isLoading} className="w-full">
          {isLoading ? 'Creating...' : 'Create Short Link'}
        </Button>
      </form>
    </div>
  )
}

export default CreateLinkForm