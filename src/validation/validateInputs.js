function validateInputs(sampleFile, masterFile){
    //both sample files must exist
    if(!sampleFile || !masterFile) return window.alert('You must select a Sample File AND Master File to merge!');
    if(sampleFile[0].type !== "text/csv" || masterFile[0].type !== "text/csv") return window.alert('Both of your files must be .CSV filetype!');
}

export default validateInputs;