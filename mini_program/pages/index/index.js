Page({
  data: {
    imagePath: '',
    calorie: ''
  },
  takePhoto() {
    wx.chooseImage({
      count: 1,
      sizeType: ['original'],
      sourceType: ['camera'],
      success: res => {
        const tempFilePath = res.tempFilePaths[0]
        this.setData({imagePath: tempFilePath, calorie: ''})
        this.uploadImage(tempFilePath)
      }
    })
  },
  uploadImage(filePath) {
    wx.uploadFile({
      url: 'http://localhost:3000/analyze', // backend endpoint
      filePath: filePath,
      name: 'image',
      success: res => {
        const data = JSON.parse(res.data)
        this.setData({calorie: data.calorie})
      },
      fail: err => {
        console.error('upload failed', err)
      }
    })
  }
})
