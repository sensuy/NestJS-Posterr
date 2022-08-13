import { Injectable } from "@nestjs/common";



@Injectable()
class DateFormatService {


	datesToFilterTimestampByDate(date: Date): Date[] {
		const year = date.getFullYear();
		const month = date.getMonth();
		const day = date.getDate();
		const initDate = new Date(year, month, day);
		const finalDate = new Date(year, month, day + 1);
		return [initDate, finalDate];
	}

}

export default DateFormatService;