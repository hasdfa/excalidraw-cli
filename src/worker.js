import Listr from 'listr'
import { Observable } from 'rxjs'
import { generateCanvasAndSaveAsImage } from './compute'

const generateTaskFromFile = (file, inputPath, outputPath, options = {}) => {
    return {
        title: file,
        task: (_, task) => new Observable(observer => {
            observer.next('Processing data...')
            const _ = generateCanvasAndSaveAsImage((inputPath ? inputPath + '/' : '') + file, inputPath, outputPath, observer, task, options)
        })
    }
}

export const generateTaskListFromFiles = (files, inputPath, outputPath, quiet, options = {}) => {
    const tasks = files.map(file => generateTaskFromFile(file, inputPath, outputPath, options))
    return new Listr(tasks, { renderer: quiet ? 'silent' : 'default' })
}

export const generateTaskListFromFile = (file, outputPath, quiet, options = {}) => {
    const tasks = generateTaskFromFile(file, '', outputPath, options)
    return new Listr([tasks], { renderer: quiet ? 'silent' : 'default' })
}