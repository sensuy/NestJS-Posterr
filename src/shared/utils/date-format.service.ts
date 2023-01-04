import { Injectable } from "@nestjs/common";

@Injectable()
class DateFormatService {

	timesTampZeroHour(date: Date): Date {
		const year = date.getFullYear();
		const month = date.getMonth();
		const day = date.getDate();
		const initDate = new Date(year, month, day);
		return initDate;
	}

	addDays(date: Date, days: number): Date {
		const newDate = new Date(date);
		newDate.setDate(newDate.getDate() + days);
		return newDate;
	}

}

export default DateFormatService;