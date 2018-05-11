import * as readline from 'readline'

export class Logger{
	log(msg: string){
		// process.stdout.write(msg);
		console.log(msg);
	}

	overwrite(msg:string){
		readline.clearLine(process.stdout, 0)
		readline.cursorTo(process.stdout, 0, null)
		this.log(msg);
	}
}
