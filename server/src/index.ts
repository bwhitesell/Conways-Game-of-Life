import syncDBConnectedModels from './entities'
import constructExpressApp from './pages'

const main = async () => {
  // if dev, we want to auto-sync the models with the db on startup
  await syncDBConnectedModels()

  // construct express app with all pages registered
  const expressApp = constructExpressApp()
  // start express app
  expressApp.listen(4000, () => {
    console.log(`Example app listening on port 4000`)
  })

}

main()