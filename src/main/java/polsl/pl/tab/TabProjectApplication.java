package polsl.pl.tab;

import io.github.cdimascio.dotenv.Dotenv;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.util.Objects;

@SpringBootApplication
public class TabProjectApplication {

	public static void main(String[] args) {
		Dotenv dotenv = Dotenv.load();

		System.setProperty("spring.datasource.url", Objects.requireNonNull(dotenv.get("DATABASE_URL")));
		System.setProperty("spring.datasource.username", Objects.requireNonNull(dotenv.get("DATABASE_USER")));
		System.setProperty("spring.datasource.password", Objects.requireNonNull(dotenv.get("DATABASE_PASSWORD")));

		SpringApplication.run(TabProjectApplication.class, args);
		
		System.out.println("Bye testing!");
	}

}
