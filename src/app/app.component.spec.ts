import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { MainContentComponent } from "./page/main-content/main-content.component";
import { MockMsrService } from "./service/mock-msr.service";
import createSpyObj = jasmine.createSpyObj;

describe('AppComponent', () => {
  let mockMsrService: any;

  beforeEach(async(() => {
    mockMsrService = createSpyObj('my-service', ['pullAges', 'pullNames']);

    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        MainContentComponent
      ],
      providers: [
        {provide: MockMsrService, useValue: mockMsrService}
      ]
    }).compileComponents();
  }));
  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
});
