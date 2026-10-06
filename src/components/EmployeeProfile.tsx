import { User, MapPin, Calendar, Briefcase } from 'lucide-react';
import type { Employee } from '../types';

interface Props {
  employee: Employee;
}

export function EmployeeProfile({ employee }: Props) {
  const initials = employee.name
    .split(' ')
    .map((n) => n[0])
    .join('');

  return (
    <div className="bg-paper rounded-2xl border border-beige p-6 animate-fade-up">
      <div className="flex items-center gap-4 mb-5">
        <div className="w-14 h-14 rounded-xl bg-sage flex items-center justify-center text-paper font-editorial text-xl font-medium">
          {initials}
        </div>
        <div>
          <h3 className="font-editorial text-xl text-charcoal font-medium">{employee.name}</h3>
          <p className="text-sm text-charcoal-muted mt-0.5">{employee.role}</p>
        </div>
      </div>

      <div className="space-y-2.5 mb-5">
        <div className="flex items-center gap-2.5 text-sm text-charcoal-light">
          <Briefcase className="w-3.5 h-3.5 text-sage" />
          <span>{employee.department} Department</span>
        </div>
        <div className="flex items-center gap-2.5 text-sm text-charcoal-light">
          <User className="w-3.5 h-3.5 text-sage" />
          <span>{employee.employeeId}</span>
        </div>
        <div className="flex items-center gap-2.5 text-sm text-charcoal-light">
          <Calendar className="w-3.5 h-3.5 text-sage" />
          <span>Joined {employee.joinDate}</span>
        </div>
        <div className="flex items-center gap-2.5 text-sm text-charcoal-light">
          <MapPin className="w-3.5 h-3.5 text-sage" />
          <span>Reports to {employee.manager}</span>
        </div>
      </div>

      <div className="border-t border-beige pt-4">
        <p className="text-xs uppercase tracking-wider text-charcoal-muted mb-3">Leave Balances</p>
        <div className="grid grid-cols-2 gap-3">
          {employee.leaveBalances.map((balance) => {
            const pct = (balance.available / balance.total) * 100;
            return (
              <div key={balance.type} className="bg-ivory-deep rounded-lg p-3">
                <p className="text-xs text-charcoal-muted mb-1">{balance.type}</p>
                <p className="font-editorial text-lg text-charcoal font-medium">
                  {balance.available}
                  <span className="text-sm text-charcoal-muted font-sans"> / {balance.total}</span>
                </p>
                <div className="mt-2 h-1 bg-beige rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full ${pct > 50 ? 'bg-sage' : pct > 25 ? 'bg-warm-orange' : 'bg-warm-orange-dark'}`}
                    style={{ width: `${pct}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
