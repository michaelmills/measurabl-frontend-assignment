import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from "@angular/platform-browser";
import { of } from "rxjs";
import { MockMsrService } from "../../service/mock-msr.service";

import { MainContentComponent } from './main-content.component';
import createSpyObj = jasmine.createSpyObj;

describe('MainContentComponent', () => {
  let component: MainContentComponent;
  let fixture: ComponentFixture<MainContentComponent>;
  let mockMsrService: any;

  beforeEach(async(() => {
    mockMsrService = createSpyObj('my-service', ['pullAges', 'pullNames']);
    mockMsrService.pullAges.and.returnValue(of([{id: "1", age: 33}, {id: "2", age: 55}, {id: "3", age: 100}]));
    mockMsrService.pullNames.and.returnValue(of([
      {id: "1", firstName: "michael", lastName: "mills"},
      {id: "2", firstName: "tom", lastName: "jones"},
      {id: "20", firstName: "jerry", lastName: "springer"}
    ]));

    TestBed.configureTestingModule({
      declarations: [ MainContentComponent ],
      providers: [
        {provide: MockMsrService, useValue: mockMsrService}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create tables', () => {
    expect(component.result).toBeDefined();
    expect(component.result.length).toBe(4);

    const rows = fixture.debugElement.queryAll(By.css('tbody tr'));

    let columns = rows[0].queryAll(By.css('td'));
    expect(columns[0].nativeElement.textContent).toBe('1');
    expect(columns[1].nativeElement.textContent).toBe('michael');
    expect(columns[2].nativeElement.textContent).toBe('mills');
    expect(columns[3].nativeElement.textContent).toBe('33');

    columns = rows[1].queryAll(By.css('td'));
    expect(columns[0].nativeElement.textContent).toBe('2');
    expect(columns[1].nativeElement.textContent).toBe('tom');
    expect(columns[2].nativeElement.textContent).toBe('jones');
    expect(columns[3].nativeElement.textContent).toBe('55');

    columns = rows[2].queryAll(By.css('td'));
    expect(columns[0].nativeElement.textContent).toBe('3');
    expect(columns[1].nativeElement.textContent).toBe('');
    expect(columns[2].nativeElement.textContent).toBe('');
    expect(columns[3].nativeElement.textContent).toBe('100');

    columns = rows[3].queryAll(By.css('td'));
    expect(columns[0].nativeElement.textContent).toBe('20');
    expect(columns[1].nativeElement.textContent).toBe('jerry');
    expect(columns[2].nativeElement.textContent).toBe('springer');
    expect(columns[3].nativeElement.textContent).toBe('');
  });
});
